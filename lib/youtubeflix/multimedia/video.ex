defmodule Youtubeflix.Multimedia.Video do
  use Ecto.Schema
  import Ecto.Changeset

  schema "videos" do
    field :title, :string
    field :url, :string

    belongs_to :category, Youtubeflix.Multimedia.Category
    belongs_to :user, Youtubeflix.Accounts.User

    timestamps()
  end

  @doc false
  def changeset(video, attrs) do
    required_fields = [:title, :url, :category_id]
    
    video
    |> cast(attrs, required_fields)
    |> validate_required(required_fields)
    |> unique_constraint(:title)
    |> assoc_constraint(:category)
    |> assoc_constraint(:user)
  end
end
