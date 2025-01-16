export const getall = async () => {
  const data = await fetch("http://localhost:3000/api/v1/todo/");
  const data1 = await data.json();
  return await data1;
};

export const deleteone = async (_id) => {
  const data = await fetch(`http://localhost:3000/api/v1/todo/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const addone = async (message) => {
  await fetch(`http://localhost:3000/api/v1/todo/`, {
    method: "POST",
    body: JSON.stringify({ goal: message }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const updateone = async (message,_id,completed=false) => {
  await fetch(`http://localhost:3000/api/v1/todo/${_id}`, {
    method: "PUT",
    body: JSON.stringify({ goal: message ,completed}),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
