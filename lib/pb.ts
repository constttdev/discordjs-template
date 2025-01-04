import Pocketbase from "pocketbase";
const pb = new Pocketbase("https://todolistbot.db.constt.de");

pb.beforeSend = function (url, options) {
  if (!options.headers) {
    return { url, options };
  }
  options.headers["token"] = "01JGPDZKD3VKQY936C26EF41YQ";

  return { url, options };
};

export async function addTodo(todo: string, user_id: number, checked: boolean) {
  const data = {
    user_id: user_id,
    todo: todo,
    checked: String(checked),
  };
  await pb.collection("todos").create(data);
}

export async function getTodos(user_id: number) {
  const resultList = await pb.collection("todos").getList(1, 50, {
    filter: `user_id = ${user_id}`,
  });
  const todos = resultList.items.map((todos) => {
    return `${todos.todo}\` ${todos.checked ? ":white_check_mark:" : ":x:"}`;
  });
  return todos;
}

export async function checkTodo(todo: string, user_id: number) {
  const resultList = await pb.collection("todos").getList(1, 50, {
    filter: `user_id = ${user_id} && todo = "${todo}"`,
  });

  if (!resultList.items.length) {
    throw new Error("Todo not found");
  }

  try {
    for (const item of resultList.items) {
      if (!item.checked) {
        const data = { checked: true };
        await pb.collection("todos").update(item.id, data);
      } else {
        const data = { checked: false };
        await pb.collection("todos").update(item.id, data);
      }
    }
  } catch (error) {
    console.error("Error checking todo:", error);
  }

  return resultList;
}

export async function removeTodo(todo: string, user_id: number) {
  const resultList = await pb.collection("todos").getList(1, 50, {
    filter: `user_id = ${user_id} && todo = "${todo}"`,
  });

  if (!resultList.items.length) {
    throw new Error("Todo not found");
  }

  try {
    for (const item of resultList.items) {
      await pb.collection("todos").delete(item.id);
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
}
