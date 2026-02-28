import type { DateObject } from "react-multi-date-picker";
import { create } from 'zustand';

interface MonthStore {
    selectedMonth?: DateObject | null;
    setSelectedMonth?: (selectedMonth: DateObject) => void; 
}

const useMonthStores = create<MonthStore>(set => ({
    selectedMonth: null,
    setSelectedMonth: (selectedMonth) => set(() => ({ selectedMonth }))
}))

export default useMonthStores
