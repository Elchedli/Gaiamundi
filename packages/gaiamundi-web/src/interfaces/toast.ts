export interface ToastData {
  title: string;
  description: string;
  type?: 'success' | 'warning' | 'error';
}

export interface ToastContent extends ToastData {
  id: number;
}
