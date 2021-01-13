# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :youtubeflix,
  ecto_repos: [Youtubeflix.Repo]

# Configures the endpoint
config :youtubeflix, YoutubeflixWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: System.get_env("SECRET_KEY_BASE"),
  render_errors: [view: YoutubeflixWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: Youtubeflix.PubSub,
  live_view: [signing_salt: "9Vzou/lC"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

config :cors_plug,
  # origin: ["http://localhost:3000"],
  max_age: 86400,
  methods: ["GET", "POST"]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
