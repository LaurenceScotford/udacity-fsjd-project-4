Complete the following steps to check the health of the backend environment:

1. Ensure you are in the **backend** folder
2. Start by connecting the EB CLI to the environment with `eb use <application name>`.
3. Check the health of the environment with `eb health`. This will display a table with information about the servers running the application.
4. If you see something other than an **OK** status, use the `eb-logs` command. This will display logs in the terminal, that you can inspect to look for failures.