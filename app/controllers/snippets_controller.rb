class SnippetsController < ApplicationController
  before_filter :typenames, only: [:index, :show]
  before_filter :authenticate_user!, :only => [:edit, :update, :destroy]

  def typenames
    @types = ['', 'html', 'css', 'js', 'rb', 'c', 'java', 'py', 'xml']
    @typenames = ['Text', 'HTML', 'CSS', 'JavaScript', 'Ruby', 'C/C++',
      'Java', 'Python', 'XML']
  end

  def index
    @snippets = Snippet.all
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @snippets }
      format.xml { render xml: @snippets }
    end
  end

  def show
    @snippet = Snippet.find(params[:id])
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @snippet }
      format.xml { render xml: @snippet }
    end
  end

  def new
    @snippet = Snippet.new
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @snippet }
      format.xml { render xml: @snippet }
    end
  end

  def edit
    @snippet = Snippet.find(params[:id])
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @snippet }
      format.xml { render xml: @snippet }
    end
  end

  def create
    @snippet = Snippet.new(params[:snippet])
    respond_to do |format|
      if @snippet.save
        format.html { redirect_to @snippet, notice: 'Snippet was successfully created.' }
        format.json { render json: @snippet, status: :created, location: @snippet }
        format.xml { render xml: @snippet, status: :created, location: @snippet }
      else
        # format.html { render action: "new" }
        format.html { redirect_to :root, notice: 'An error has occurred.' }
        format.json { render json: @snippet.errors, status: :unprocessable_entity }
        format.xml { render xml: @snippet.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    @snippet = Snippet.find(params[:id])
    respond_to do |format|
      if @snippet.update_attributes(params[:snippet])
        format.html { redirect_to @snippet, notice: 'Snippet was successfully updated.' }
        format.json { head :no_content }
        format.xml { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @snippet.errors, status: :unprocessable_entity }
        format.xml { render xml: @snippet.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @snippet = Snippet.find(params[:id])
    @snippet.destroy
    respond_to do |format|
      format.html { redirect_to snippets_url }
      format.json { render json: {redirect_url: snippets_url}, status: :ok }
      format.xml { render xml: {redirect_url: snippets_url}, status: :ok }
    end
  end
end
