defmodule Youtubeflix.Multimedia.Category do
  use Ecto.Schema
  import Ecto.Changeset

  schema "categories" do
    field :color, :string, default: "#000000"
    field :extra_text, :string
    field :extra_url, :string
    field :title, :string

    has_many :videos, Youtubeflix.Multimedia.Video

    timestamps()
  end

  
  def changeset(category, attrs) do
    required_fields = [:title, :color]
    optional_fields = [:extra_text, :extra_url]

    category
    |> cast(attrs, required_fields ++ optional_fields)
    |> validate_required(required_fields)
    |> unique_constraint(:title)
  end
end
