import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
// Fetch Finances
const fetchFinances = async () => {
  const token = localStorage.getItem("clrtyToken");
  const response = await fetch(`${baseURL}/finance/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};

export function fetchFinanceOptions() {
  return queryOptions({
    queryKey: ["fetchFinances"],
    queryFn: fetchFinances,
  });
}

const addFinance = async (financeData) => {
  const token = localStorage.getItem("clrtyToken");

  response = await fetch(`${baseURL}/finance/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(financeData),
  });
  return await response.json();
};

export function addFinanceOptions() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addFinance,

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchFinances"] });
      console.log("Finance added successfully");
    },
  });
}
