require 'spec_helper'

FactoryGirl.define do
  factory :user do
    name "test user"
    email "abc@example.com"
    password "password"
    password_confirmation "password"
  end
end

describe SnippetsController do
  include Devise::TestHelpers
  before (:each) do
    @request.env["devise.mapping"] = Devise.mappings[:user]
    user = FactoryGirl.create(:user)
    sign_in user
  end

  def valid_attributes
    {:name => "snippet name", :content => "some code"}
  end

  describe "GET index" do
    it "assigns all snippets as @snippets" do
      snippet = Snippet.create! valid_attributes
      get :index, {}
      assigns(:snippets).should eq([snippet])
    end
  end

  describe "GET show" do
    it "assigns the requested snippet as @snippet" do
      snippet = Snippet.create! valid_attributes
      get :show, {:id => snippet.to_param}
      assigns(:snippet).should eq(snippet)
    end
  end

  describe "GET new" do
    it "assigns a new snippet as @snippet" do
      get :new, {}
      assigns(:snippet).should be_a_new(Snippet)
    end
  end

  describe "GET edit" do
    it "assigns the requested snippet as @snippet" do
      snippet = Snippet.create! valid_attributes
      get :edit, {:id => snippet.to_param}
      assigns(:snippet).should eq(snippet)
    end
  end

  describe "POST create" do
    describe "with valid params" do
      it "creates a new Snippet" do
        expect {
          post :create, {:snippet => valid_attributes}
        }.to change(Snippet, :count).by(1)
      end

      it "assigns a newly created snippet as @snippet" do
        post :create, {:snippet => valid_attributes}
        assigns(:snippet).should be_a(Snippet)
        assigns(:snippet).should be_persisted
      end

      it "redirects to the created snippet" do
        post :create, {:snippet => valid_attributes}
        response.should redirect_to(Snippet.last)
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved snippet as @snippet" do
        Snippet.any_instance.stub(:save).and_return(false)
        post :create, {:snippet => {}}
        assigns(:snippet).should be_a_new(Snippet)
      end

      it "re-renders the 'new' template" do
        Snippet.any_instance.stub(:save).and_return(false)
        post :create, {:snippet => {}}
        response.should redirect_to(:root)
      end
    end
  end

  describe "PUT update" do
    describe "with valid params" do
      it "updates the requested snippet" do
        snippet = Snippet.create! valid_attributes
        Snippet.any_instance.should_receive(:update_attributes).with({'these' => 'params'})
        put :update, {:id => snippet.to_param, :snippet => {'these' => 'params'}}
      end

      it "assigns the requested snippet as @snippet" do
        snippet = Snippet.create! valid_attributes
        put :update, {:id => snippet.to_param, :snippet => valid_attributes}
        assigns(:snippet).should eq(snippet)
      end

      it "redirects to the snippet" do
        snippet = Snippet.create! valid_attributes
        put :update, {:id => snippet.to_param, :snippet => valid_attributes}
        response.should redirect_to(snippet)
      end
    end

    describe "with invalid params" do
      it "assigns the snippet as @snippet" do
        snippet = Snippet.create! valid_attributes
        Snippet.any_instance.stub(:save).and_return(false)
        put :update, {:id => snippet.to_param, :snippet => {}}
        assigns(:snippet).should eq(snippet)
      end

      it "re-renders the 'edit' template" do
        snippet = Snippet.create! valid_attributes
        Snippet.any_instance.stub(:save).and_return(false)
        put :update, {:id => snippet.to_param, :snippet => {}}
        response.should render_template("edit")
      end
    end
  end

  describe "DELETE destroy" do
    it "destroys the requested snippet" do
      snippet = Snippet.create! valid_attributes
      expect {
        delete :destroy, {:id => snippet.to_param}
      }.to change(Snippet, :count).by(-1)
    end

    it "redirects to the snippets list" do
      snippet = Snippet.create! valid_attributes
      delete :destroy, {:id => snippet.to_param}
      response.should redirect_to(snippets_url)
    end
  end

end
