var routes = require('../routes');
var fs = require('fs');
var path= require('path');
var webData = require('../lib/webData');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Product = require('../models/models').Product;

var username = 'admin';
var password = 'admin';
var uploadDirProducts = __dirname + "/../public/img/uploads/products/";
var noImageDir = __dirname + "/../public/img/no-image.jpg";
var maxProductRequest = 10;

function importProduction() {
  fs.readdir('public/img/uploads/products', function(err, files) {
    console.log(files);
    for (var i = 1; i < files.length; i++) {
      if (files[i] != '.DS_Store') {
        var name = 'Sản Phẩm ' + i;
        var product = new Product({ 'name': name });
        product.inputDate = Date.now();
        product.type = 0;
        product._id = files[i];
        product.save();
      }
    }
  });
};
// importProduction();
//client side
exports.index = function(req, res) {
  res.render('index', { 
    title: 'Cơ khí chính xác Bách Khoa Hà Nội',
    productTypes: webData.productTypes,
    serviceTypes: webData.serviceTypes
  });
};

exports.contactUs = function(req, res) {
  res.render('contactUs', { 
    title: 'Cơ Khí Chính Xác | Liên hệ',
    productTypes: webData.productTypes,
    serviceTypes: webData.serviceTypes
  });
};

exports.aboutUs = function(req, res) {
  res.render('aboutUs', { 
    title: 'Cơ Khí Chính Xác | Giới thiệu',
    productTypes: webData.productTypes,
    serviceTypes: webData.serviceTypes
  });
};

exports.services = function(req, res) {
  res.render('services', { 
    title: 'Cơ Khí Chính Xác | Dịch Vụ',
    productTypes: webData.productTypes,
    serviceTypes: webData.serviceTypes
  });
};

exports.products = function(req, res) {
  var currentType = null;
  getProductsByType(req.query.type, req.query.startIndex, function(products, pages) {
    if (req.query.type == 'all') {
      currentType = { 'id': 'all', 'name': 'Tất cả' };
    } else {
      currentType = webData.productTypes[req.query.type];
    }
    res.render('products', {
      title: 'Cơ Khí Chính Xác | Sản Phẩm',
      products: products,
      productTypes: webData.productTypes,
      serviceTypes: webData.serviceTypes,
      pages: pages,
      currentIndex: req.query.startIndex,
      currentType: currentType
    });
  });
};

exports.training = function(req, res) {
  res.render('training', { 
    title: 'Cơ Khí Chính Xác | Đào Tạo',
    productTypes: webData.productTypes,
    trainingType: webData.training
  });
};

function getProductsByType(type, startIndex, callback) {
  if (type == 'all') {
    Product.find().sort({ 'inputDate': -1 }).skip(startIndex).limit(maxProductRequest).exec(function(error, products) {
      paging(type, function(pages) {
        callback(products, pages);
      });
    });
  } else {
    Product.find({ 'type': type }).sort({ 'inputDate': -1 }).skip(startIndex).limit(maxProductRequest).exec(function(error, products) {
      paging(type, function(pages) {
        callback(products, pages);
      });
    });
  }
}

function getAllProducts(startIndex, callback) {
  Product.find().sort({ 'inputDate': -1 }).skip(startIndex).limit(maxProductRequest).exec(function(error, products) {
    paging('all', function(pages) {
      callback(products, pages);
    });
  });
};

function paging(type, callback) {
  if (type == 'all') {
    Product.count({}, function(err, count) {
      var pages = [];
      var pageIndex = 1;
      var numPage = Math.ceil(count / maxProductRequest);
      for (var i = 0; i < numPage; i++) {
        pages.push({ 'index': pageIndex, 'startIndex': i * maxProductRequest });
        pageIndex++;
      }
      callback(pages);
    });
  } else {
    Product.count({ 'type': type }, function(err, count) {
      var pages = [];
      var pageIndex = 1;
      var numPage = Math.ceil(count / maxProductRequest);
      for (var i = 0; i < numPage; i++) {
        pages.push({ 'index': pageIndex, 'startIndex': i * maxProductRequest });
        pageIndex++;
      }
      callback(pages);
    });
  }
}

//server side
exports.login = function(req, res) {
  res.render('admin/login', { 
    title: 'Cơ Khí Chính Xác | Liên hệ',
    error: '',
    login: 'true'
  });
};

exports.manage = function(req, res) {
  if (req.body.loginButton == 'Login') {
    if (req.body.username == username && req.body.password == password) {
      routes.manageProducts(req, res, 'display');
    } else {
      res.render('admin/login', { 
        title: 'Cơ Khí Chính Xác | Liên hệ',
        error: 'true',
        login: 'true'
      });
    }
  }
};

exports.manageProducts = function(req, res, redirectPage) {
  if (redirectPage == 'display') {
    getAllProducts(0, function(products, pages) {
      res.render('admin/manageProducts', { 
        title: 'Cơ Khí Chính Xác | Admin',
        login: 'false',
        page: 'display',
        productTypes: webData.productTypes,
        products: products,
        pages: pages,
        productsActive: 'left-menu-active',
        servicesActive: ''
      });
    });
    return;
  }
  switch (req.body.productFunction)
  {
    case "Insert":
      var details = {};
      for (var i in req.body) {
        if (i.indexOf("attribute") > -1 && req.body[i] != '') {
          var valueIndex = 'value' + i.charAt(i.length-1);
          details[req.body[i]] = req.body[valueIndex];
        }
      }
      var product = new Product({ 'name': req.body.name });
      product.inputDate = Date.now();
      product.details = details;
      product.type = parseInt(req.body.productType);
      product.save();
      uploadFiles(req, res, product._id);
      break;
    case "Edit":
      Product.findOne({ _id: req.body.id }, function(error, product) {
        product.name = req.body.name;
        product.type = req.body.productType;
        var details = {};
        for (var i in req.body) {
          if (i.indexOf("attribute") > -1 && req.body[i] != '') {
            var valueIndex = 'value' + i.charAt(i.length-1);
            details[req.body[i]] = req.body[valueIndex];
          }
        }
        product.details = details;
        product.save(function(err) {
          if (err) {
            console.log(err);
          }
          editFiles(req, res, req.body.id, 0, function() {
            getAllProducts(0, function(products, pages) {
              res.render('admin/manageProducts', { 
                title: 'Cơ Khí Chính Xác | Admin',
                login: 'false',
                page: 'display',
                productTypes: webData.productTypes,
                pages: pages,
                products: products,
                productsActive: 'left-menu-active',
                servicesActive: ''
              });
              return;
            });
          });
        });
      });
      break;
    case "Delete":
      Product.remove({ _id: req.body.productId }, function (error) {
        if (error) {
          console.log(error);
        }
        removeFolder(uploadDirProducts + req.body.productId + '/');
        getAllProducts(0, function(products, pages) {
          res.render('admin/manageProducts', { 
            title: 'Cơ Khí Chính Xác | Admin',
            login: 'false',
            page: 'display',
            productTypes: webData.productTypes,
            pages: pages,
            products: products,
            productsActive: 'left-menu-active',
            servicesActive: ''
          });
          return;
        });
      });
      break;
  }
  switch (req.query.page) {
    case 'insert':
      res.render('admin/manageProducts', { 
        title: 'Cơ Khí Chính Xác | Admin',
        login: 'false',
        page: 'insert',
        productTypes: webData.productTypes,
        productsActive: 'left-menu-active',
        servicesActive: ''
      });
      break;
    case 'edit':
      Product.findOne({ _id: req.query.pid }, function(error, product) {
        res.render('admin/manageProducts', { 
          title: 'Cơ Khí Chính Xác | Admin',
          login: 'false',
          page: 'edit',
          product: product,
          productTypes: webData.productTypes,
          productsActive: 'left-menu-active',
          servicesActive: ''
        });
      });
      break;
    case 'display':
      getAllProducts(req.query.startIndex, function(products, pages) {
        res.render('admin/manageProducts', { 
          title: 'Cơ Khí Chính Xác | Admin',
          login: 'false',
          page: 'display',
          productTypes: webData.productTypes,
          products: products,
          pages: pages,
          productsActive: 'left-menu-active',
          servicesActive: ''
        });
      });
      break;
  }
};

function editFiles(req, res, id, fileNum, callback) {
  if (req.files['displayImage'+fileNum].size > 0) {
    var newPath = uploadDirProducts + id + '/' + id + fileNum + '.jpg';
    fs.rename(req.files['displayImage'+fileNum].path, newPath, function(err) {
      if (err) {
        console.log(err);
      }
      if (fileNum < 2) {
        fileNum += 1;
        editFiles(req, res, id, fileNum, callback);
      } else {
        callback();
      }
    });
  } else {
    if (fileNum < 2) {
      fileNum += 1;
      editFiles(req, res, id, fileNum, callback);
    } else {
      callback();
    }
  }
};

function moveFile(req, res, id, fileNum, callback) {
  if (req.files['displayImage'+fileNum].size > 0) {
    var newPath = uploadDirProducts + id + '/' + id + fileNum + '.jpg';
    fs.rename(req.files['displayImage'+fileNum].path, newPath, function(err) {
      if (err) {
        console.log(err);
      }
      if (fileNum < 2) {
        fileNum += 1;
        moveFile(req, res, id, fileNum, callback);
      } else {
        callback();
      }
    });
  } else {
    var newPath = uploadDirProducts + id + '/' + id + fileNum + '.jpg';
    fs.createReadStream(noImageDir).pipe(fs.createWriteStream(newPath));
    if (fileNum < 2) {
      fileNum += 1;
      moveFile(req, res, id, fileNum, callback);
    } else {
      callback();
    }
  }
};

function uploadFiles(req, res, id) {
  path.exists(uploadDirProducts + id + '/', function (exists) {
    if (!exists) {
      fs.mkdir(uploadDirProducts + id + '/', 0777, function(err) {
        moveFile(req, res, id, 0, function() {
          res.render('admin/manageProducts', { 
            title: 'Cơ Khí Chính Xác | Admin',
            login: 'false',
            page: 'insert',
            productTypes: webData.productTypes,
            productsActive: 'left-menu-active',
            servicesActive: ''
          });
        });
        return;
      });
    } else {
      moveFile(req, res, id, 0, function() {
        res.render('admin/manageProducts', { 
          title: 'Cơ Khí Chính Xác | Admin',
          login: 'false',
          page: 'insert',
          productTypes: webData.productTypes,
          productsActive: 'left-menu-active',
          servicesActive: ''
        });
      });
      return;
    }
  });

};

function removeFolder(dirPath) {
  try { 
    var files = fs.readdirSync(dirPath); 
  } catch(e) { return; }
  if (files.length > 0)
    for (var i = 0; i < files.length; i++) {
      var filePath = dirPath + '/' + files[i];
      if (fs.statSync(filePath).isFile()) {
        fs.unlinkSync(filePath);        
      } else {
        rmDir(filePath);        
      }
    }
  fs.rmdirSync(dirPath);
}