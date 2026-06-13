import { useCallback, useState } from "react";

export interface DialogHelperState {
  isOpen: boolean;
  title: string;
  description: string;
  record?: any; // ✅ NEW: Store the record to be deleted
}

export interface ShowDialogParams {
  title: string;
  description: string;
  record?: any; // ✅ NEW: Pass the record
}

export function useDialogHelper() {
  const [state, setState] = useState<DialogHelperState>({
    isOpen: false,
    title: "",
    description: "",
    record: undefined,
  });

  /**
   * ✅ Show dialog with title, description, and optional record
   */
  const showDialog = useCallback((params: ShowDialogParams) => {
    setState({
      isOpen: true,
      title: params.title,
      description: params.description,
      record: params.record,
    });
  }, []);

  /**
   * ✅ Hide dialog and clear state
   */
  const hideDialog = useCallback(() => {
    setState({
      isOpen: false,
      title: "",
      description: "",
      record: undefined,
    });
  }, []);

  return {
    dialogHelper: state,
    showDialog,
    hideDialog,
  };
}
