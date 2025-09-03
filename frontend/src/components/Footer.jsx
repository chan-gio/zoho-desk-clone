import React from 'react'
import { Layout, Typography, Space } from 'antd'
import { useTranslation } from 'react-i18next'
import './Footer.scss'

const { Footer: AntFooter } = Layout
const { Text } = Typography

const Footer = () => {
  const { t } = useTranslation()

  return (
    <AntFooter className="footer">
      <div className="footer-content">
        <Space direction="vertical" size="small" align="center">
          <Text type="secondary">
            {t('footer.copyright')}
          </Text>
          <Space size="middle">
            <Text type="secondary" className="footer-link">
              {t('footer.termsOfService')}
            </Text>
            <Text type="secondary" className="footer-link">
              {t('footer.privacyPolicy')}
            </Text>
            <Text type="secondary" className="footer-link">
              {t('footer.support')}
            </Text>
          </Space>
        </Space>
      </div>
    </AntFooter>
  )
}

export default Footer
