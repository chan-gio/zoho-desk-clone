// Mock data with order structure
export const initialColumns = [
  {
    id: 'todo',
    title: 'To Do',
    color: '#8B5CF6',
    order: 1,
    tickets: [
      {
        id: '1',
        title: 'Fix login issue',
        description: 'Users cannot login with Google account',
        priority: 'high',
        assignee: 'John Doe',
        dueDate: '2024-01-15',
        tags: ['bug', 'auth'],
        columnId: 'todo',
        order: 1
      },
      {
        id: '2',
        title: 'Update documentation',
        description: 'Update API documentation for new endpoints',
        priority: 'medium',
        assignee: 'Jane Smith',
        dueDate: '2024-01-20',
        tags: ['documentation'],
        columnId: 'todo',
        order: 2
      }
    ]
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    color: '#3B82F6',
    order: 2,
    tickets: [
      {
        id: '3',
        title: 'Implement dark mode',
        description: 'Add dark mode toggle to the application',
        priority: 'high',
        assignee: 'Mike Johnson',
        dueDate: '2024-01-18',
        tags: ['feature', 'ui'],
        columnId: 'in-progress',
        order: 1
      }
    ]
  },
  {
    id: 'review',
    title: 'Review',
    color: '#F59E0B',
    order: 3,
    tickets: [
      {
        id: '4',
        title: 'Code review for payment module',
        description: 'Review the new payment integration code',
        priority: 'medium',
        assignee: 'Sarah Wilson',
        dueDate: '2024-01-22',
        tags: ['review', 'payment'],
        columnId: 'review',
        order: 1
      }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    color: '#10B981',
    order: 4,
    tickets: [
      {
        id: '5',
        title: 'Setup CI/CD pipeline',
        description: 'Configure automated deployment pipeline',
        priority: 'high',
        assignee: 'Alex Brown',
        dueDate: '2024-01-10',
        tags: ['devops', 'ci-cd'],
        columnId: 'done',
        order: 1
      }
    ]
  }
];

export const priorityColors = {
  low: '#52C41A',
  medium: '#FAAD14',
  high: '#FF4D4F'
};

export const priorityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High'
};
