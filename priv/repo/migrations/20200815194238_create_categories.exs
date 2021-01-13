defmodule Youtubeflix.Repo.Migrations.CreateCategories do
  use Ecto.Migration

  def change do
    create table(:categories) do
      add :title, :string, null: false
      add :color, :string
      add :extra_text, :string
      add :extra_url, :string

      timestamps()
    end

    create unique_index(:categories, [:title])
  end
end
