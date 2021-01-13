defmodule YoutubeflixWeb.Schema.Middleware.Authenticate do
  @behaviour Absinthe.Middleware

  def call(resolution_struct, _configuration) do

    case resolution_struct.context do
      %{current_user: _} ->
        resolution_struct

      _ ->
        resolution_struct
        |> Absinthe.Resolution.put_result({:error, "Please sign in first!"})
    end
  end
end
