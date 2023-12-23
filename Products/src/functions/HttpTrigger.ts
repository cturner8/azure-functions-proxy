import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

const handler = async (
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> => {
  context.log(`Processing products request`);
  return {
    status: 200,
    jsonBody: {
      service: "products",
      request,
    },
  };
};

app.http("HttpTrigger", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler,
});
