
(function($){
  $.fn.serializeHash = function() {
    var hash = {};
    function stringKey(key, value) {
      var beginBracket = key.lastIndexOf('[');
      if (beginBracket == -1) {
        var hash = {};
        hash[key] = value;
        return hash;
      }
      var newKey = key.substr(0, beginBracket);
      var newValue = {};
      newValue[key.substring(beginBracket + 1, key.length - 1)] = value;
      return stringKey(newKey, newValue);
    }

    var els = $(this).find(':input').get();
    $.each(els, function() {
        if (this.name && !this.disabled && (this.checked || /select|textarea/i.test(this.nodeName) || /hidden|text|search|tel|url|email|password|datetime|date|month|week|time|datetime-local|number|range|color/i.test(this.type))) {
            var val = $(this).val();
            $.extend(true, hash, stringKey(this.name, val));
        }
    });
    return hash;
  };
})(jQuery);

function deleteKeys() {
  localStorage.removeItem("AccessKeyId");
  localStorage.removeItem("SecretAccessKey");
  window.location.href = "index.html"
}

(function(d) {
  $( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    $inputs = $( this ).serializeHash();
    if (typeof(Storage) != "undefined") {
      // Store
      localStorage.setItem("AccessKeyId", $inputs["AccessKeyId"]);
      localStorage.setItem("SecretAccessKey", $inputs["SecretAccessKey"]);
      AWS.config.update({accessKeyId: localStorage.getItem("AccessKeyId"), secretAccessKey: localStorage.getItem("SecretAccessKey")});
      AWS.config.region = 'eu-west-1';
      var params = { };
      var ec2 = new AWS.EC2({apiVersion: '2015-04-15'});
      ec2.describeInstances(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
      });
    } else {
      console.log( "Sorry, your browser does not support Web Storage..." );
    }
  });
})(document);