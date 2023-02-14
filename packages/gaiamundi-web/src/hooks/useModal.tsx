import { Dialog, Transition } from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/24/solid';
import React, {
  createContext,
  FC,
  Fragment,
  ReactNode,
  Reducer,
  useContext,
  useReducer,
} from 'react';

type ModalState = {
  title: string | null;
  Component: React.FC<any> | null;
  props?: any;
};

interface ModalContext {
  showModal: (modal: ModalState) => void;
  hideModal: () => void;
  isVisible: boolean;
}

const ModalContext = createContext<ModalContext>({
  showModal: (_modal: ModalState) => undefined,
  hideModal: () => undefined,
  isVisible: false,
});

const { Provider, Consumer: ModalConsumer } = ModalContext;

type ModalAction = ({ type: 'openModal' } & ModalState) | { type: 'hideModal' };

const reducer: Reducer<ModalState, ModalAction> = (
  state: ModalState,
  action
) => {
  switch (action.type) {
    case 'openModal': {
      const { title, Component, props } = action;
      return { ...state, title, Component, props };
    }
    case 'hideModal':
      return { ...state, title: null, Component: null, props: {} };
    default:
      throw new Error('Unspecified reducer action');
  }
};

const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const initialState = {
    title: null,
    Component: null,
    props: {},
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { title, Component, props } = state;
  const isVisible = !!Component;

  const showModal = (modal: ModalState) => {
    dispatch({ type: 'openModal', ...modal });
  };

  const hideModal = () => {
    dispatch({ type: 'hideModal' });
  };

  return (
    <Provider value={{ ...state, showModal, hideModal, isVisible }}>
      {children}
      <Transition appear show={isVisible} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          open={isVisible}
          onClose={hideModal}
          static={true}
        >
          {/* The backdrop, rendered as a fixed sibling to the panel container */}
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Dialog.Panel className="relative p-5 mx-auto w-3/4	rounded bg-white">
                <div className="absolute top-0 right-0 cursor-pointer">
                  <XCircleIcon
                    onClick={hideModal}
                    className="m-2 h-8 w-8 text-blue-800"
                  />
                </div>
                {title && (
                  <Dialog.Title
                    className={
                      'text-xl font-semibold font-medium text-gray-900 title-font mb-3'
                    }
                  >
                    {title}
                  </Dialog.Title>
                )}

                {isVisible && <Component {...props} />}
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Provider>
  );
};

const useModal = () => useContext(ModalContext);

export { ModalConsumer, ModalProvider, useModal };