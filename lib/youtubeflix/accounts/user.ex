defmodule Youtubeflix.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :password_hash, :string
    field :username, :string
    field :password, :string, virtual: true

    has_many :videos, Youtubeflix.Multimedia.Video

    timestamps()
  end

  def changeset(user, attrs) do
    required_fields = [:username, :email, :password]

    user
    |> cast(attrs, required_fields)
    |> validate_required(required_fields)
    |> validate_length(:username, min: 4)
    |> validate_length(:password, min: 6)
    # |> unique_constraint(:username)
    # |> unique_constraint(:email)

    # |> unique_constraint([:username,:email])
    |> unique_constraint(:username, name: :users_username_email_index)

    |> hash_password()
  end

  defp hash_password(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: password}} ->
        put_change(changeset, :password_hash, Pbkdf2.hash_pwd_salt(password))

      _ ->
        changeset
    end
  end
end
