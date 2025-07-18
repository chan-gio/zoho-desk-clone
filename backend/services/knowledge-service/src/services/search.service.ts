import { Client } from '@elastic/elasticsearch';

const ELASTIC_INDEX_ARTICLE = 'articles';
const ELASTIC_INDEX_CATEGORY = 'categories';

export class SearchService {
  private client: Client;

  constructor(elasticUrl: string) {
    this.client = new Client({ node: elasticUrl });
  }

  async indexArticle(article: any) {
    const { _id, ...doc } = article.toObject ? article.toObject() : article;
    await this.client.index({
      index: ELASTIC_INDEX_ARTICLE,
      id: _id?.toString() || article._id?.toString(),
      document: doc,
    });
  }

  async removeArticle(articleId: string) {
    await this.client.delete({
      index: ELASTIC_INDEX_ARTICLE,
      id: articleId,
    });
  }

  async searchArticles(keyword: string, tenantId: string, page = 1, limit = 10) {
    const esQuery = {
      index: ELASTIC_INDEX_ARTICLE,
      from: (page - 1) * limit,
      size: limit,
      query: {
        bool: {
          must: [
            { match: { tenantId } },
            {
              multi_match: {
                query: keyword,
                fields: ['title', 'summary', 'content', 'tags'],
              },
            },
          ],
        },
      },
    };
    const { hits } = await this.client.search(esQuery);
    return hits.hits.map((hit: any) => hit._source);
  }

  async indexCategory(category: any) {
    const { _id, ...doc } = category.toObject ? category.toObject() : category;
    await this.client.index({
      index: ELASTIC_INDEX_CATEGORY,
      id: category._id.toString(),
      document: doc,
    });
  }

  async removeCategory(categoryId: string) {
    await this.client.delete({
      index: ELASTIC_INDEX_CATEGORY,
      id: categoryId,
    });
  }

  async searchCategories(keyword: string, tenantId: string, page = 1, limit = 10) {
    const { hits } = await this.client.search({
      index: ELASTIC_INDEX_CATEGORY,
      from: (page - 1) * limit,
      size: limit,
      query: {
        bool: {
          must: [
            { match: { tenantId } },
            {
              multi_match: {
                query: keyword,
                fields: ['name', 'description'],
              },
            },
          ],
        },
      },
    });
    return hits.hits.map((hit: any) => hit._source);
  }
} 