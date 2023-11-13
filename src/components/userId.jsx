"use server";

import { jwtVerifier } from "../app/api/utils/jwt";
import { cookies } from "next/headers";

const userId = async () => {
  const { value } = cookies().get("token") || {};
  if (!value) {
    return null;
  }
  const {
    payload: { payload },
  } = await jwtVerifier(value);
  return payload?.id || null;
};

export default userId;
