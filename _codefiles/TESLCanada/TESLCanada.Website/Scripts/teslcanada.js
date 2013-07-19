
var TESL = {};

TESL.Slider =
    {
        Items: null,
        Speed: 333,
        NextItem: 0,
        NavContainer: null,
        NavItems: null,
        Width: 960,
        Container: null,
        AutoRun: true,
        AutoDelay: 5000,
        Timer: null,
        Init: function (item)
        {
            this.Items = $(item).find("ul li");
            this.Container = $(item).find("ul");
            this.NavContainer = $(item).find("ol");

            var that = this;
            this.Items.each(function (i)
            {
                var li = $("<li />");
                li.click(function ()
                {
                    clearTimeout(that.Timer);
                    that.AutoRun = false;
                    that.Show(i);
                });
                that.NavContainer.append(li);

                $(this).click(function ()
                {
                    clearTimeout(that.Timer);
                    that.AutoRun = false;
                    //var num = i == that.Items.length - 1 ? 0 : i + 1;
                    //that.Show(num);
                });
            });
            this.NavItems = $(item).find("ol li");
            this.Container.css("width", this.Items.length * this.Width);

            this.Show(0);
        },
        Show: function (i)
        {
            if (i == (this.Items.length - 1))
                this.NextItem = 0;
            else
                this.NextItem = i + 1;

            this.NavItems.removeClass("active");
            this.NavItems[i].className = "active";

            this.Container.animate({
                left: -(i * this.Width)
            }, this.Speed);

            if (this.AutoRun)
            {
                var that = this;
                this.Timer = setTimeout(function ()
                {
                    that.Show(that.NextItem);
                }, this.AutoDelay);
            }
        }
    };


TESL.ProgramTable = function(elm)
{
    this.BindEvents = function()
    {
        $(elm).find(".icon-note").bind("mouseenter", function()
        {
            var offset = $(this).offset();
            var notebox = $("<div class='notebox' />").html(this.getAttribute("data-text"));
            $("article").append(notebox);
            
            notebox.css({
                left: offset.left - 248,
                top: offset.top - (notebox.height() + 43)
            });

        }).bind("mouseleave", function ()
        {
            $(".notebox").remove();
        });
    };

    this.BindEvents();
};