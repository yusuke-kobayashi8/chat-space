Rails.application.routes.draw do
  devise_for :users
  root "groups#index"
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:new, :create, :edit, :update, :update] do
    resources :messages, only: [:index, :create, :edit, :update]
  end
end
