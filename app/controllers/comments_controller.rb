class CommentsController < ApplicationController
  before_filter :get_snippet
  before_filter :authenticate_user!, :only => [:create, :destroy]
  respond_to :json

  # GET /comments.json
  def index
    @comments = @snippet.comments.order('linenum ASC')
    respond_to do |format|
      format.json { render json: @comments.to_json(:include => :user) }
    end
  end

  # POST /comments.json
  def create
    @comment = @snippet.comments.build(params[:comment])

    respond_to do |format|
      if @comment.save
        # format.json { render json: @comment, status: :ok, location: @comment }
        format.json { render json: @comment.to_json(:include => :user), status: :ok }
      else
        # format.json { render json: @comment.errors, status: :unprocessable_entity }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /comments/1.json
  def destroy
    @comment = @snippet.comments.find(params[:id])
    @comment.destroy

    respond_to do |format|
      format.json { head :no_content }
    end
  end

private
  def get_snippet
    @snippet = Snippet.find params[:snippet_id]
  end
end

