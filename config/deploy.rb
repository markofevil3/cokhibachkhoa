set :application, "Cokhibachkhoa"
set :user, "ec2-user"
set :runner, user
# set :repository, "svn+ssh://root@118.70.129.253/svn/alley_labs/SolitaireRush/trunk"
set :deploy_to, "/home/ec2-user/www/cokhibachkhoa"
# set :revision, ENV['revision'] if ENV['revision']
# set :keep_releases, 5
set :use_sudo, false
ssh_options[:keys] = ["#{ENV['HOME']}/.ssh/bpquanpublic.pem"]

set :scm, :git
set :repository, "git@github.com:markofevil3/smartjsc.git"
set :branch, "stable"
set :repository_cache, "git_cache"
set :deploy_via, :remote_cache
# set :ssh_options, { :forward_agent => true }

set :smartjsc_server, "ec2-54-251-73-184.ap-southeast-1.compute.amazonaws.com"
role :app, smartjsc_server

namespace :smartjsc do
  after "smartjsc:update", "smartjsc:restart"

  task :update, :roles => :app do
    run "cd /home/ec2-user/www/smartjsc; git pull"
  end

  task :start, :roles => :app do
    run "cd /home/ec2-user/www/smartjsc; mongod --dbpath ~/mongodb/data >> production.log 2>&1 &"
    run "cd /home/ec2-user/www/smartjsc; ./start.sh >> production.log 2>&1 &"
  end

  task :stop, :roles => :app do
    run "cd /home/ec2-user/www/smartjsc; sudo pkill node >> production.log 2>&1 &"
  end

  task :restart, :roles => :app do
    transaction do
      stop
      start
    end
  end
end
