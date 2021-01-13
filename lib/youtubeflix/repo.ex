defmodule Youtubeflix.Repo do
  use Ecto.Repo,
    otp_app: :youtubeflix,
    adapter: Ecto.Adapters.Postgres
end
