import { authConfig} from "../auth";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";

export function currentUser() {
  return Prisma.defineExtension((client) => {
    return client.$extends({
      model: {
        user: {
          async currentUser() {
            const session = await getServerSession(authConfig as any);
            

            // @ts-ignore 
            if (!session?.user?.email) {
              return null;
            } 

             
            const user = await client.user.findUnique({
              where: {
                // @ts-ignore
                email: session.user.email,
              },
            });
            return user;
          },
        },
      },
    });
  });
}
