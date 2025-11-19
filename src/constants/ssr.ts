export const GET_SERVER_SIDE_PROPS_REDIRECT_RESULT = {
  redirect: { destination: "/login", permanent: false },
} as const;

export const GET_SERVER_SIDE_PROPS_NOT_FOUND_RESULT = {
  notFound: true,
} as const;
