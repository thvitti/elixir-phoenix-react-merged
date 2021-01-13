defmodule Youtubeflix.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    import Supervisor.Spec
    
    children = [
      # Start the Ecto repository
      Youtubeflix.Repo,
      # Start the Telemetry supervisor
      YoutubeflixWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Youtubeflix.PubSub},
      # Start the Endpoint (http/https)
      YoutubeflixWeb.Endpoint,
      supervisor(Absinthe.Subscription, [YoutubeflixWeb.Endpoint])

      # Start a worker by calling: Youtubeflix.Worker.start_link(arg)
      # {Youtubeflix.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Youtubeflix.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    YoutubeflixWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
