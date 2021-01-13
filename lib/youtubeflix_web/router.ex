defmodule YoutubeflixWeb.Router do
  use YoutubeflixWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug YoutubeflixWeb.Plugs.SetCurrentUser
  end


  scope "/" do
    pipe_through :api

    forward "/api", Absinthe.Plug,
      schema: YoutubeflixWeb.Schema.Schema

    forward "/graphiql", Absinthe.Plug.GraphiQL,
      schema: YoutubeflixWeb.Schema.Schema,
      socket: YoutubeflixWeb.UserSocket

  end

end
