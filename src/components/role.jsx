"use server";

import { jwtVerifier } from "../app/api/utils/jwt";
import { cookies } from "next/headers";

// This is the role component
const role = async () => {
  const { value } = cookies().get("token") || {};
  if (!value) {
    return null;
  }
  const {
    payload: { payload },
  } = await jwtVerifier(value);
  return payload?.role || null;
};

export default role;
