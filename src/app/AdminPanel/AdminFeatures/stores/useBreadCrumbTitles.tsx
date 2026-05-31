import { create } from 'zustand'

interface BreadCrumbTitlesState {
  breadCrumbTitle: string[];
}

interface BreadCrumbTitlesActions {
  setBreadCrumbTitle: (newTitle: string[]) => void;
}
type BreadCrumbTitlesStore = BreadCrumbTitlesState & BreadCrumbTitlesActions;

const useBreadCrumbTitles = create<BreadCrumbTitlesStore>((set) => ({
  breadCrumbTitle: [],

  setBreadCrumbTitle: (breadCrumbTitle) => set({ breadCrumbTitle }),
}));

export default useBreadCrumbTitles