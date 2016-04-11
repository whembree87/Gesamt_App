var q = require("q");

module.exports = function(db, mongoose) {

  var FormSchema = require('./form.schema.server.js')(mongoose);
  var FormModel = mongoose.model("Form", FormSchema);

  var api = {
    createFormForUser: createFormForUser,
    findAllForms: findAllForms,
    getFormsByUserId: getFormsByUserId,
    updateFormById: updateFormById,
    deleteFormById: deleteFormById,
    findFormByTitle: findFormByTitle,
    getFormById: getFormById
  };

  return api;

  //////////////////////

  function createFormForUser(form) {
    var deferred = q.defer();
    FormModel.create(newForm, function (err, forms) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(forms);
      }
    });
    return deferred.promise;
  }

  //////////////////////

  function findAllForms() {
    var deferred = q.defer();
    FormModel.find(function (err, forms) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(forms);
      }
    });
    return deferred.promise;
  }
  //////////////////////

  // userId --> forms
  function getFormsByUserId(userIdGiven) {
    console.log(userIdGiven, "formModel")
    var deferred = q.defer();
    FormModel.find({userId: userIdGiven}, function (err, formsFound) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(formsFound);
      }
    });
    return deferred.promise;
  }

  //////////////////////

  function updateFormById(formId, form) {
    var deferred = q.defer();
    FormModel.update({_id: formId}, {$set: form}, function (err, form) {
      if (err) {
        deferred.reject(err);
      } else {
        FormModel.find(function (err, forms) {
          if (err) {
            deferred.reject(err);
          } else {
            deferred.resolve(forms);
          }
        });
      }
    });
    return deferred.promise;
  }

  //////////////////////

  function deleteFormById(formId) {
    var deferred = q.defer();
    FormModel.remove({_id: formId},function (err, forms) {
      if (err) {
        deferred.reject(err);
      } else {
        FormModel.find(function (err, forms) {
          if (err) {
            deferred.reject(err);
          } else {
            deferred.resolve(forms);
          }
        });
      }
    });
    return deferred.promise;
  }

  //////////////////////

  function findFormByTitle(titleGiven) {
    var deferred = q.defer();
    FormModel.findOne({title: titleGiven}, function (err, formFound) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(formFound);
      }
    });
    return deferred.promise;
  }

  //////////////////////

  // formId --> form
  function getFormById(formId) {
    var deferred = q.defer();
    FormModel.findById(formId, function (err, formFound) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(formFound);
      }
    });
    return deferred.promise;
  }

  //////////////////////

}