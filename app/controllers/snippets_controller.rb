# require 'coderay'

class SnippetsController < ApplicationController
  before_filter :typenames, only: [:index, :show]

  def typenames
    @types = ['', 'html', 'css', 'js', 'rb', 'c', 'java', 'py', 'xml']
    @typenames = ['Text', 'HTML', 'CSS', 'JavaScript', 'Ruby', 'C/C++',
      'Java', 'Python', 'XML']
    # types = [:text, :html, :css, :javascript, :ruby, :json, :c, :java,
    #   :python, :php, :xml]
    # typenames = { :text => 'Text', :html => 'HTML', :css => 'CSS',
    #   :javascript => 'JavaScript', :ruby => 'Ruby', :json => 'JSON',
    #   :c => 'C/C++', :java => 'Java', :python => 'Python', :php => 'PHP',
    #   :xml => 'XML' }
  end

  # GET /snippets
  # GET /snippets.json
  def index
    @snippets = Snippet.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @snippets }
    end
  end

  # GET /snippets/1
  # GET /snippets/1.json
  def show
    @snippet = Snippet.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @snippet }
    end
  end

  # GET /snippets/new
  # GET /snippets/new.json
  def new
    @snippet = Snippet.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @snippet }
    end
  end

  # GET /snippets/1/edit
  def edit
    @snippet = Snippet.find(params[:id])
  end

  # POST /snippets
  # POST /snippets.json
  def create
    @snippet = Snippet.new(params[:snippet])

    respond_to do |format|
      if @snippet.save
        format.html { redirect_to @snippet, notice: 'Snippet was successfully created.' }
        format.json { render json: @snippet, status: :created, location: @snippet }
      else
        # format.html { render action: "new" }
        format.html { redirect_to :root, notice: 'An error has occurred.' }
        format.json { render json: @snippet.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /snippets/1
  # PUT /snippets/1.json
  def update
    @snippet = Snippet.find(params[:id])
    respond_to do |format|
      if @snippet.update_attributes(params[:snippet])
        format.html { redirect_to @snippet, notice: 'Snippet was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @snippet.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /snippets/1
  # DELETE /snippets/1.json
  def destroy
    @snippet = Snippet.find(params[:id])
    @snippet.destroy

    respond_to do |format|
      # if @snippet.destroy
      # else
      # end
      format.html { redirect_to snippets_url }
      # format.json { head :no_content }
      format.json { render json: {redirect_url: snippets_url}, status: :ok }
    end
  end
end
