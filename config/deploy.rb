set :application, "Unipass"
set :repository,  "git@github.com:uniba/#{application}.git"

set :scm, :git
set :scm_verbose, true
set :git_shallow_clone, 1
set :branch, "master"

set :deploy_to, "~/app/#{application}"
set :deploy_via, :remote_cache

set :use_sudo, false

set :user, "deploy"
set :group, "deploy"

role :web, "pass.uniba.jp"                          
role :app, "pass.uniba.jp"                          
role :db,  "pass.uniba.jp", :primary => true 

set :default_environment, {
  "PATH" => "~/.nodebrew/current/bin:/usr/local/bin:/sbin:$PATH"
}

default_run_options[:pty] = true
ssh_options[:forward_agent] = true

namespace :deploy do
  task :start, :roles => :app do
    sudo "forever start #{current_path}/app.js"
  end
  task :stop, :roles => :app do
    sudo "forever stop #{current_path}/app.js"
  end
  task :restart, :roles => :app, :except => { :no_release => true } do
    sudo "forever restart #{current_path}/app.js"
  end
end

after "deploy:create_symlink", :roles => :app do
  run "ln -svf #{shared_path}/node_modules #{current_path}/node_modules"
  run "cd #{current_path} && npm i"
end

after "deploy:setup", :roles => :app do
  run "mkdir -p #{shared_path}/node_modules"
end