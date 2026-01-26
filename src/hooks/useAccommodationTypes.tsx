import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface AccommodationTypeApi {
  value: string;
  lable: string;
}

const useAccommodationTypes = () => {
  const [data, setData] = useState<AccommodationTypeApi[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setError("");

    apiClient
      .get<AccommodationTypeApi[]>("admin/accommodation_types/", {
        signal: controller.signal,
      })
      .then((res) => setData(res.data))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      })

    return () => controller.abort();
  }, []);

  return { data, error };
};

export default useAccommodationTypes;
