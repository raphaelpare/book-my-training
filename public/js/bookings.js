angular.module('bookingApp', []);
// Register `phoneList` component, along with its associated controller and template
angular.
  module('bookingApp').
  component('bookingList', {
    template:
        '<ul>' +
          '<li ng-repeat="booking in $ctrl.bookings">' +
            '<span>{{booking.name}}</span>' +
            '<p>{{booking.snippet}}</p>' +
          '</li>' +
        '</ul>',
    controller: function BookingListController() {
      this.bookings = [
        {
          name: 'Kek',
          snippet: 'Kuk.'
        }
      ];
    }
});