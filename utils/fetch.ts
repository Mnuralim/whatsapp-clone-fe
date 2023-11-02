export const updateUser = async (userId: string, body: BodyInit | null | undefined) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/v1/users/${userId}`, {
      method: "PATCH",
      body: body,
      cache: "no-store",
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const newMessageText = async (from: string, to: string, message: string) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/v1/messages/${from}/${to}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const newMessageImage = async (from: string, to: string, file: BodyInit) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/v1/messages/${from}/${to}`, {
      method: "POST",
      body: file,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const newMessageAudio = async (from: string, to: string, file: BodyInit) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/v1/messages/${from}/${to}`, {
      method: "POST",
      body: file,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMessages = async (from: string, to: string) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/v1/messages/${from}/${to}`, {
      method: "DELETE",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
