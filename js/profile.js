(function(){
  //private members
  var completed = [
    'COMP1405'
  ];
  var compulsory = [
    'COMP1405',
    'COMP1406',
    'COMP2406'
  ];
  /**
   * Student Object
   * @type {Object}
   */
  window.profile = {
    /**
     * Appends course to array of completed courses.
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    pushToCompleted: function(e){
      if(typeof e !== 'object')
        throw new Error('requires[object]');
      completed.push(e['dept'] + e['num']);
    },
    pushToCompulsary: function(e){
      if(typeof e !== 'object')
        throw new Error('requires[object]');
      compulsory.push(e['dept'] + e['num']);
    },
    getCompleted: function(){
      return completed.slice(); //avoids getCompleted().push
    },
    getCompulsory: function(){
      return compulsory.slice();
    }
  };
})();
