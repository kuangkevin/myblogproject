/**
 * Created by K on 2016/11/17.
 */

exports.md5 = function(inputStr){

    return require('crypto').createHash('md5').update(inputStr).digest('hex');
};

