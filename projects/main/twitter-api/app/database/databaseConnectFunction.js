
export const createConnectFunction = (connectLogic) => async () => {
    try {
      await connectLogic();
    } catch (error) {
      console.error("Error connecting to database:", error);
    }
  };
  
  export const createDisconnectFunction = (disconnectLogic) => async () => {
    try {
      await disconnectLogic();
    } catch (error) {
      console.error("Error disconnecting from database:", error);
    }
  };
  