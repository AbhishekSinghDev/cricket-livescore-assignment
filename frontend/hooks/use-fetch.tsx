"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib";
import { TStatus } from "@/types";

type UseFetchProps = {
  reqType: "GET" | "POST";
  endpoint: string;
  token?: string; // Made optional to improve flexibility
  isAuthReq?: boolean; // Default to false for non-auth requests
  body?: Record<string, unknown>; // For POST request payloads
};

const useFetch = ({
  reqType,
  endpoint,
  token = "",
  isAuthReq = false,
  body,
}: UseFetchProps) => {
  const [data, setData] = useState<unknown | null>(null);
  const [status, setStatus] = useState<TStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus("loading");
        const headers: Record<string, string> =
          isAuthReq && token ? { Authorization: `Bearer ${token}` } : {};

        let response;
        if (reqType === "GET") {
          response = await axiosInstance.get(endpoint, { headers });
        } else if (reqType === "POST") {
          response = await axiosInstance.post(endpoint, body, { headers });
        } else {
          throw new Error(`Unsupported request type: ${reqType}`);
        }

        setData(response.data);
        setStatus("success");
      } catch (err) {
        setStatus("error");
        setError("An error occurred");
      }
    };

    fetchData();
  }, [reqType, endpoint, token, isAuthReq, body]);

  return { data, status, error };
};

export default useFetch;
