defmodule YoutubeflixWeb.Resolvers.Accounts do

  alias Youtubeflix.Accounts
  alias Youtubeflix.Accounts

  def signin(_, %{username: username, password: password}, _) do
    case Accounts.authenticate(username, password) do
      :error ->
        {:error, "Whoops, invalid credentials!"}

      {:ok, user} ->
        token = YoutubeflixWeb.AuthToken.sign(user)
        {:ok, %{user: user, token: token}}
    end
  end

  def me(_, _, %{ context: %{ current_user: user } }) do
    {:ok, user}
  end

  def me(_,_,_) do
    {:ok, nil}
  end





end
