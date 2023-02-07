import { Toast } from 'components/Toast/Toast';
import { ToastContent, ToastData } from 'interfaces/toast';
import { createContext, useCallback, useContext, useState } from 'react';

const ToastContext = createContext({
  addToast: (_data: ToastData) => {
    /* noop */
  },
  removeToast: (_id: number) => {
    /* noop */
  },
});

let id = 1;

type ToastProviderProps = {
  children: React.ReactNode;
};

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastContent[]>([]);

  const addToast = useCallback(
    (toast: ToastData) => {
      setToasts((toasts: ToastContent[]) => [
        ...toasts,
        {
          id: id++,
          ...toast,
        },
      ]);
    },
    [setToasts]
  );

  const removeToast = useCallback(
    (id: number) => {
      setToasts((toasts) => toasts.filter((t) => t.id !== id));
    },
    [setToasts]
  );

  return (
    <ToastContext.Provider
      value={{
        addToast,
        removeToast,
      }}
    >
      <div className="absolute top-0 right-0 z-50 w-full max-w-sm">
        {toasts.map((toast) => (
          <Toast toast={toast} key={toast.id} />
        ))}
      </div>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
