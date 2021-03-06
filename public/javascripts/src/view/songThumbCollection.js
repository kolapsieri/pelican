define(['underscore', 'backbone', 'view/songThumb'], function (_, Backbone, SongThumb) {
  return Backbone.View.extend({
    tagName: 'ul',

    attributes: {
      className: 'songThumbCollection'
    },

    initialize: function () {
      this.collection.on('reset', this.reset.bind(this));

      this.collection.on('add', function (model) {
        this.add(model);
      }, this);

      this.collection.on('remove', function (model) {
        this.remove(model);
      }, this);
    },

    empty: function () {
      return '<li class="empty">No songs in queue</li>'
    },

    reset: function () {
      this.$el.html(this.empty());
      this.collection.each(this.add.bind(this));
    },

    add: function (model) {
      // Clear "empty" communicate
      this.$el.find('.empty').remove();

      // Create new view and push it to `this.views`
      var view = new SongThumb({
        model: model,
        tagName: 'li'
      });
      this.views.push(view);

      // Make view appear 
      this.$el.append(view.el);
      view.render();
      view.$el.hide();
      view.$el.fadeIn();
    },

    remove: function (model) {
      // Remove view from collection
      this.views = _(this.views).reject(function (view) {
        var reject = view.model === model; 

        if (reject) {
          view.$el.fadeOut(function () {
            view.remove();

            // Show "empty" communicate
            if (!this.views.length) {
              this.$el.html(this.empty());
            }
          }.bind(this));
        }

        return reject;
      }, this);
    },

    views: []
  });
});