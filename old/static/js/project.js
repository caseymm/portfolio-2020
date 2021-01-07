$(document).ready(function () {
  $('#archive-table').dataTable({
    oLanguage: { sSearch: '' },
    iDisplayLength: 50,
    order: [[3, 'desc']],
  });
  $('input').addClass('form-control right').attr('placeholder', 'Search');
  $('#archive-table_length').hide();
  $('.dataTables_paginate').hide();
  $('.dataTables_info').hide();
});
