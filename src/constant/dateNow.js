export const date = new Intl.DateTimeFormat("id",
    { day : "numeric", month : "long", year : "numeric"}
  ).format(new Date())