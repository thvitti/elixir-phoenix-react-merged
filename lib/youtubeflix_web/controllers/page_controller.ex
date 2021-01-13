defmodule YoutubeflixWeb.PageController do
  use YoutubeflixWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
