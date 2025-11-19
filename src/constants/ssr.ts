export const GET_SERVER_SIDE_PROPS_REDIRECT_RETURN = {
  redirect: { destination: "/login", permanent: false },
} as const;

export const GET_SERVER_SIDE_PROPS_NOT_FOUND_RETURN = {
  notFound: true,
} as const;
