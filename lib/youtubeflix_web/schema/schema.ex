defmodule YoutubeflixWeb.Schema.Schema do
  use Absinthe.Schema

  import Absinthe.Resolution.Helpers, only: [dataloader: 1, dataloader: 3]

  alias YoutubeflixWeb.Resolvers

  alias YoutubeflixWeb.Schema.Middleware


  query do

	  @desc "Get a category by id"
	  field :category, :category do
	  	arg :id, non_null(:id)
	  	resolve &Resolvers.Multimedia.category/3
	  end

	  @desc "Get a list of categories"
	  field :categories, list_of(:category) do
	  	arg :limit, :integer
	  	resolve &Resolvers.Multimedia.list_categories/3
	  end

    @desc "Get current user"
    field :me, :user do
      resolve &Resolvers.Accounts.me/3
    end

  end

  mutation do

    @desc "Creating a video"
    field :create_video, :video do
      arg :title, non_null(:string)
      arg :url, non_null(:string)
      arg :category, non_null(:string)
      arg :category_id, non_null(:id)
      middleware Middleware.Authenticate
      resolve &Resolvers.Multimedia.create_video/3
    end

    @desc "Change a category"
    field :change_video_category, :video do
      arg :id, non_null(:id)
      arg :category_id, non_null(:id)
      resolve &Resolvers.Multimedia.change_video_category/3
    end

    @desc "Create a category"
    field :create_category, :category do
      arg :title, non_null(:string)
      arg :color, non_null(:string)
      arg :extra_url, :string
      arg :extra_text, :string
      middleware Middleware.Authenticate
      resolve &Resolvers.Multimedia.create_category/3
    end

    @desc "User Sign-in"
    field :signin, :session do
      arg :username, non_null(:string)
      arg :password, non_null(:string)
      resolve &Resolvers.Accounts.signin/3
    end


  end

  # Object Types
  object :category do
  	field :id, non_null(:id)
  	field :title, non_null(:string)
  	field :color, non_null(:string)
  	field :extra_text, :string
  	field :extra_url, :string
  	field :videos, list_of(:video), resolve: dataloader(Multimedia)

  end

  object :video do
  	field :id, non_null(:id)
  	field :category_id, non_null(:id)
  	field :title, non_null(:string)
  	field :url, non_null(:string)
    field :user, :user, resolve: dataloader(Accounts)
  end

  object :user do
    field :username, non_null(:string)
    field :email, non_null(:string)
    field :videos, list_of(:video), resolve: dataloader(Multimedia)
  end

  object :session do
    field :user, non_null(:user)
    field :token, non_null(:string)
  end


	def context(ctx) do
		source = Dataloader.Ecto.new(Youtubeflix.Repo)

		loader =
			Dataloader.new
      |> Dataloader.add_source(Multimedia, source)
			|> Dataloader.add_source(Accounts, source)

    Map.put(ctx, :loader, loader)


	end

  def plugins do
  	[Absinthe.Middleware.Dataloader] ++ Absinthe.Plugin.defaults()
  end


end
