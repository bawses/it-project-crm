interface User {
  fname: string
  lname: string
}

function formatUsername(user: User) {
  return user.fname + ' ' + user.lname
}

export const element = (
  <h1>
    Hello, {formatUsername({ fname: "Ainsley", lname: "Harriott" })}
  </h1>
)