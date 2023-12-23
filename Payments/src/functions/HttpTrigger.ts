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
  context.log(`Processing payments request`);
  return {
    status: 200,
    jsonBody: {
      service: "payments",
      request,
    },
  };
};

app.http("HttpTrigger", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler,
});
