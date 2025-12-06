import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axios = useAxiosSecure();

  useEffect(() => {
    axios
      .patch(`/session-status?session_id=${sessionId}`)
      .then((res) => console.log(res.data));
  }, [axios, sessionId]);

  return (
    <div>
      <p>payment successful</p>
    </div>
  );
};

export default PaymentSuccess;
